package com.example.edublocks.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.edublocks.Models.Usuario;
import com.example.edublocks.Services.*;;

@RestController
public class UsuariosController {

    @GetMapping("/usuarios/all")
    public List<Usuario> obtenerUsuarios() {
        return new RegistroDb().obtenerTodosUsuarios();
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable int id) {
        boolean eliminado = new RegistroDb().eliminarUsuario(id); // Asegúrate de que este método esté implementado en
                                                                  // tu servicio
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
