/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.usa.edu.ciclo4.crudrepository;

import co.usa.edu.ciclo4.model.Usuario;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Andre
 */

public interface UsuarioInterface extends CrudRepository<Usuario, Integer>{
    
    public boolean existsByEmail(String email);
    
    public Usuario findByEmailAndPassword(String email, String password);
    
}
