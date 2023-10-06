using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class PersonaController : Controller
    {
        // GET: Persona
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarPersona()
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return Json(oPersonaBL.listarPersona(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult filtrarPersona(int iidtipousuario)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return Json(oPersonaBL.filtrarPersona(iidtipousuario),
                JsonRequestBehavior.AllowGet);
        }

        public int eliminarPersona(int iidpersona)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return oPersonaBL.eliminarPersona(iidpersona);
        }

        public JsonResult recuperarPersona(int iidpersona)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return Json(oPersonaBL.recuperarPersona(iidpersona),
                JsonRequestBehavior.AllowGet);
        }

        public int Guardar(PersonaCLS oPersona)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return oPersonaBL.guardarPersona(oPersona);
        }
    }
}