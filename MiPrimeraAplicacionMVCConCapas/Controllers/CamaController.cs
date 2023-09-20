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
            CamaBL oCamaBL = new CamaBL();
            return oCamaBL.guardarCama(oCamaCLS);
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
            return Json(oCamaBL.listarCama(),JsonRequestBehavior.AllowGet);
        }

        //Simular que ya lo cree
        public JsonResult filtrarCama(string nombre)
        {
            CamaBL oCamaBL = new CamaBL();
            return Json(oCamaBL.filtrarCama(nombre), JsonRequestBehavior.AllowGet);
        }
    }
}