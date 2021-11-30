/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.edu.ciclo4.controller;

import co.usa.edu.ciclo4.model.Usuario;
import co.usa.edu.ciclo4.service.UsuarioService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Andre
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class UsuarioController {
     /**
     * Injección del servicio de usuarios
     */
    @Autowired
    private UsuarioService usuarioservice;
    
    /**
     * Mapeado de petición web Http de tipo GET para obtener todos los usuarios
     * @return retorna todos los usuarios creados
     */
    @GetMapping("/all")
    public List<Usuario> getUsuarios(){
        return usuarioservice.getAllUsuarios();
    } 
    /**
     * Mapeado de petición web Http de tipo POST para registrar un nuevo usuario
     * @param usuario objeto de tipo usuario que se debe enviar para su creación
     * @return retorna el usuario creado 
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario save(@RequestBody Usuario usuario){
        return usuarioservice.saveUsuario(usuario);
    }
    /**
     * Mapeado para la verificación de email existente en la BD por medio de petición
     * web Http tipo GET
     * @param email correo electrónico a verificar su existencia
     * @return una respuesta verdadero o falso dependiendo de la existencia del
     * parámetro enviado
     */
    @GetMapping("/{email}")
    public boolean verificarEmail(@PathVariable String email){
        return usuarioservice.verificador(email);
    }
    /**
     * Mapeado de petición web Http tipo GET para el login de usuario en la Webapp
     * @param email correo electrónico del usuario a logear
     * @param password password del usuario a logear
     * @return un objeto de tipo usuario dependiendo de su existencia
     */
    @GetMapping("/{email}/{password}")
    public Usuario verificarSimilitud(@PathVariable String email,@PathVariable String password){
        return usuarioservice.validarUsuario(email, password);
        }
    }
