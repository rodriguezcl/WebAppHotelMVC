using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class CamaController : Controller
    {
        // GET: Cama
        public ActionResult Index()
        {
            return View();
        }

        public int guardarCama(CamaCLS oCamaCLS)
        {
            return 0;
        }

        public int eliminarCama(int idcama)
        {
            return 0;
        }

        public CamaCLS recuperarCama(int idcamita)
        {
            return null;
        }

        public JsonResult listarCama()
        {
            CamaBL oCamaBL = new CamaBL();
            return Json(oCamaBL.listarCama(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarCama(string nombrecama)
        {
            CamaBL oCamaBL = new CamaBL();
            return Json(oCamaBL.filtrarCama(nombrecama), JsonRequestBehavior.AllowGet);
        }
    }
}