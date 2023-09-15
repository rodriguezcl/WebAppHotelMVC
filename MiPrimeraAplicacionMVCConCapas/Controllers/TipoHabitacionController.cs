using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class TipoHabitacionController : Controller
    {
        // GET: TipoHabitacion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult lista()
        {
            TipoHabitacionBL obj = new TipoHabitacionBL();
            return Json(obj.listarTipoHabitacion(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarTipohabitacionPorNombre(string nombrehabitacion)
        {
            TipoHabitacionBL obj = new TipoHabitacionBL();
            return Json(obj.filtrarTipoHabitacion(nombrehabitacion), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(TipoHabitacionCLS oTipoHabitacionCLS)
        {
            TipoHabitacionBL obj = new TipoHabitacionBL();
            return obj.guardarTipoHabitacion(oTipoHabitacionCLS);
        }

        public JsonResult recuperarTipoHabitacion(int id)
        {
            TipoHabitacionBL obj = new TipoHabitacionBL();
            return Json(obj.recuperarTipoHabitacion(id), JsonRequestBehavior.AllowGet);
        }





    }
}