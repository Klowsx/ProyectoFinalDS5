package com.example.edublocks.Services;

import java.sql.*;

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

    public boolean registrarPuntosUsuario(Usuario usuario) {
        boolean resultado = false;
        String query = "EXEC UpdateUserPoints @UserID = ?, @puntos = ?";
        
        try {
            PreparedStatement pstmt = _cn.prepareStatement(query);
            pstmt.setInt(1, usuario.getIdUsuario());
            pstmt.setInt(2, usuario.getPuntos());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                resultado = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resultado;
    }
}
