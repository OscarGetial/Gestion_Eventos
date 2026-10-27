require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors({ origin: "http://localhost:8443" }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

// Comprobar que Neon responde
// Obtener todos los eventos desde Neon
app.get("/api/eventos", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM eventos ORDER BY fecha ASC"
    );

    res.json(resultado.rows);

  } catch (error) {
    console.error("Error consultando eventos:", error.message);

    res.status(500).json({
      error: "No se pudieron cargar los eventos"
    });
  }
});

// Consultar eventos
app.post("/api/eventos", async (req, res) => {
  try {
    const {
      code, name, description, theater, city,
      startDate, startTime, endDate, endTime,
      capacity, price, observations
    } = req.body;

    const capacidad = Number(capacity);
    const precio = Number(price);

    if (
      !name?.trim() ||
      !description?.trim() ||
      !theater?.trim() ||
      !city?.trim() ||
      !startDate ||
      !startTime ||
      capacity === "" ||
      capacity == null ||
      price === "" ||
      price == null
    ) {
      return res.status(400).json({
        error: "Completa los campos obligatorios"
      });
    }

    if (
      !Number.isSafeInteger(capacidad) ||
      capacidad <= 0 ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      return res.status(400).json({
        error: "Capacidad o precio inválidos"
      });
    }

    if ((endDate && !endTime) || (!endDate && endTime)) {
      return res.status(400).json({
        error: "Completa la fecha y hora de finalización"
      });
    }

    const inicio = `${startDate} ${startTime}:00`;
    const fin = endDate && endTime
      ? `${endDate} ${endTime}:00`
      : null;

    if (fin && fin < inicio) {
      return res.status(400).json({
        error: "La fecha final debe ser posterior al inicio"
      });
    }

    const resultado = await pool.query(
      `INSERT INTO eventos (
        codigo, titulo, descripcion, lugar, ciudad,
        fecha, fecha_fin, capacidad, disponibles,
        precio, observaciones, estado
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, 'active'
      )
      RETURNING *`,
      [
        code || `EVT-${Date.now()}`,
        name.trim(),
        description.trim(),
        theater.trim(),
        city.trim(),
        inicio,
        fin,
        capacidad,
        capacidad,
        precio,
        observations || null
      ]
    );

    res.status(201).json({
      mensaje: "Evento guardado correctamente en Neon",
      evento: resultado.rows[0]
    });

  } catch (error) {
    console.error("Error al guardar evento:", error.message);

    res.status(500).json({
      error: "No se pudo guardar el evento"
    });
  }
});

const PORT = process.env.PORT || 3001;
app.patch("/api/eventos/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosPermitidos = [
      "active",
      "cancelled",
      "sold-out"
    ];

    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({
        error: "Estado no válido"
      });
    }

    const resultado = await pool.query(
      `UPDATE eventos
       SET estado = $1
       WHERE id = $2
       RETURNING *`,
      [estado, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: "Evento no encontrado"
      });
    }

    res.json({
      mensaje: "Estado actualizado correctamente",
      evento: resultado.rows[0]
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "No se pudo actualizar el evento"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});