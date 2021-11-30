
package co.usa.edu.ciclo4.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Andre
 */
@Entity
@Table(name = "usuario")
//@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Usuario implements Serializable{
   
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(unique=true, nullable = false)
   private Integer id;
   
   @Column(name = "user_email",length=50, nullable = true)
   private String email;
   @Column(name = "user_password",length=50, nullable = false)
   private String password;
   @Column(name = "user_name",length=80, nullable = false)
   private String name;
   
   public Usuario() {
        super();
   }

    public Usuario(Integer id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id= id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

   @Override
    public String toString() {
        return "Usuario{" + "id=" + id + ", email=" + email + ", password=" + password + ", name=" + name + '}';
    }
   
    
}
