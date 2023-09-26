using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class PersonaBL
    {
        public List<PersonaCLS> listarPersona()
        {
            PersonaDAL oPersonaDAL = new PersonaDAL();
            return oPersonaDAL.listarPersona();
        }

        public List<PersonaCLS> filtrarPersona(int iidtipousuario)
        {
            PersonaDAL oPersonaDAL = new PersonaDAL();
            return oPersonaDAL.filtrarPersona(iidtipousuario);
        }

        public PersonaCLS recuperarPersona(int iidpersona)
        {
            PersonaDAL oPersonaDAL = new PersonaDAL();
            return oPersonaDAL.recuperarPersona(iidpersona);
        }

        public int guardarPersona(PersonaCLS oPersonaCLS)
        {
            PersonaDAL oPersonaDAL = new PersonaDAL();
            return oPersonaDAL.guardarPersona(oPersonaCLS);
        }


    }
}
