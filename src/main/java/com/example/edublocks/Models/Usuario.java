package com.example.edublocks.Models;

public class Usuario {
    private int idUsuario;
    private String Usuario;
    private String Correo;
    private String Contrasena;
    private int Puntos;
    private int LeccionMasAlta;
    private String NombreLeccion;

    public Usuario(int idUsuario, String usuario, String correo, String contrasena, int puntos, int leccionMasAlta,
            String nombreLeccion) {
        this.idUsuario = idUsuario;
        Usuario = usuario;
        Correo = correo;
        Contrasena = contrasena;
        Puntos = puntos;
        LeccionMasAlta = leccionMasAlta;
        NombreLeccion = nombreLeccion;
    }

    public Usuario() {
    }

    public int getPuntos() {
        return Puntos;
    }

    public void setPuntos(int puntos) {
        Puntos = puntos;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsuario() {
        return Usuario;
    }

    public void setUsuario(String usuario) {
        Usuario = usuario;
    }

    public String getCorreo() {
        return Correo;
    }

    public void setCorreo(String correo) {
        Correo = correo;
    }

    public String getContrasena() {
        return Contrasena;
    }

    public void setContrasena(String contrasena) {
        Contrasena = contrasena;
    }

    public int getLeccionMasAlta() {
        return LeccionMasAlta;
    }

    public void setLeccionMasAlta(int leccionMasAlta) {
        LeccionMasAlta = leccionMasAlta;
    }

    public String getNombreLeccion() {
        return NombreLeccion;
    }

    public void setNombreLeccion(String nombreLeccion) {
        NombreLeccion = nombreLeccion;
    }
}