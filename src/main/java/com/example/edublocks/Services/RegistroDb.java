package com.example.edublocks.Services;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.example.edublocks.Models.Usuario;

public class RegistroDb {
    Connection _cn;

    public RegistroDb() {
        _cn = new Conexion().openDb();
    }

    public int RegistrarUsuario(Usuario usuario) {
        int resultado = 0;

        try {
            Statement stm = _cn.createStatement();
            String query = "INSERT INTO Users (Usuario, Correo, Contrasena) VALUES ('"
                    + usuario.getIdUsuario() + "', '" + usuario.getCorreo() + "', '" + usuario.getContrasena() + "')";

            resultado = stm.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public Usuario obtenerUsuario(Usuario usuario) {
        String query = "SELECT u.IdUsuario, u.Usuario, u.Correo, u.Contrasena, u.Puntos, u.LeccionMasAlta, l.NombreLeccion, u.codRol "
                +
                "FROM Users u " +
                "INNER JOIN Lecciones l ON u.LeccionMasAlta = l.IdLeccion " +
                "WHERE u.Correo = ? AND u.Contrasena = ?";
        try {
            PreparedStatement pstmt = _cn.prepareStatement(query);
            pstmt.setString(1, usuario.getCorreo());
            pstmt.setString(2, usuario.getContrasena());
            ResultSet result = pstmt.executeQuery();

            if (result.next()) {
                Usuario usuarioEncontrado = new Usuario();
                usuarioEncontrado.setIdUsuario(result.getInt("idUsuario"));
                usuarioEncontrado.setUsuario(result.getString("Usuario"));
                usuarioEncontrado.setCorreo(result.getString("Correo"));
                usuarioEncontrado.setContrasena(result.getString("Contrasena"));
                usuarioEncontrado.setPuntos(result.getInt("Puntos"));
                usuarioEncontrado.setLeccionMasAlta(result.getInt("LeccionMasAlta"));
                usuarioEncontrado.setNombreLeccion(result.getString("NombreLeccion"));
                usuarioEncontrado.setCodRol(result.getInt("codRol"));
                return usuarioEncontrado;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean registrarPuntosUsuario(int idUsuario, int puntos) {
        boolean resultado = false;
        String query = "UPDATE Users SET Puntos = Puntos + ? WHERE IdUsuario = ?";

        try (PreparedStatement pstmt = _cn.prepareStatement(query)) {
            pstmt.setInt(1, puntos);
            pstmt.setInt(2, idUsuario);

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                resultado = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resultado;
    }

    public int obtenerPuntosUsuario(int idUsuario) {
        String query = "SELECT Puntos FROM Users WHERE IdUsuario = ?";
        int puntos = 0;
        try {
            PreparedStatement pstmt = _cn.prepareStatement(query);
            pstmt.setInt(1, idUsuario);
            ResultSet result = pstmt.executeQuery();

            if (result.next()) {
                puntos = result.getInt("Puntos");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return puntos;
    }

    public boolean actualizarLeccionMasAlta(int idUsuario, int idLeccion) {
        String query = "UPDATE Users SET LeccionMasAlta = ? WHERE IdUsuario = ?";
        try (PreparedStatement pstmt = _cn.prepareStatement(query)) {
            pstmt.setInt(1, idLeccion);
            pstmt.setInt(2, idUsuario);

            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Usuario> obtenerTodosUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        String query = "SELECT u.IdUsuario, u.Usuario, u.Correo, u.Contrasena, u.Puntos, u.LeccionMasAlta, l.NombreLeccion, u.codRol "
                + "FROM Users u "
                + "INNER JOIN Lecciones l ON u.LeccionMasAlta = l.IdLeccion";
        try (Statement stmt = _cn.createStatement();
                ResultSet result = stmt.executeQuery(query)) {

            while (result.next()) {
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(result.getInt("IdUsuario"));
                usuario.setUsuario(result.getString("Usuario"));
                usuario.setCorreo(result.getString("Correo"));
                usuario.setContrasena(result.getString("Contrasena"));
                usuario.setPuntos(result.getInt("Puntos"));
                usuario.setLeccionMasAlta(result.getInt("LeccionMasAlta"));
                usuario.setNombreLeccion(result.getString("NombreLeccion"));
                usuario.setCodRol(result.getInt("codRol"));

                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return usuarios;
    }

    public boolean eliminarUsuario(int idUsuario) {
        String query = "DELETE FROM Users WHERE idUsuario = ?";
        boolean eliminado = false;

        try (PreparedStatement pstmt = _cn.prepareStatement(query)) {
            pstmt.setInt(1, idUsuario);
            int rowsAffected = pstmt.executeUpdate();
            eliminado = rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return eliminado;
    }

}
