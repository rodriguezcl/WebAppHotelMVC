using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.IO;
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

        public int Guardar(PersonaCLS oPersona, HttpPostedFileBase fotopersona)
        {
            string nombreFoto = "";
            byte[] bufferfoto;
            //Llenar la foto y el nombre foto
            if (fotopersona!=null)
            {
                nombreFoto = fotopersona.FileName;
                BinaryReader lector = new BinaryReader(fotopersona.InputStream);
                bufferfoto = lector.ReadBytes((int)fotopersona.ContentLength);
                oPersona.foto = bufferfoto;
                oPersona.nombrefoto = nombreFoto;
            }

            PersonaBL oPersonaBL = new PersonaBL();
            return oPersonaBL.guardarPersona(oPersona);
        }
    }
}