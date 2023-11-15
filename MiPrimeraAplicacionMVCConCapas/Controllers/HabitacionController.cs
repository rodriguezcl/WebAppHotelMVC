using Capa_Entidad;
using Capa_Negocio;
using MiPrimeraAplicacionMVCConCapas.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    [Seguridad]
    public class HabitacionController : Controller
    {
        // GET: Habitacion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult recuperarHabitacion(int idhabitacion)
        {
            HabitacionBL obj = new HabitacionBL();
            return Json(obj.recuperarHabitacion(idhabitacion), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarHabitacionList()
        {
            HabitacionBL obj = new HabitacionBL();
            return Json(obj.listarHabitacionList(), JsonRequestBehavior.AllowGet);
        }

        public int guardarHabitacion(HabitacionCLS oHabitacionCLS)
        {
            HabitacionBL obj = new HabitacionBL();
            return obj.guardarHabitacion(oHabitacionCLS);
        }

    }
}