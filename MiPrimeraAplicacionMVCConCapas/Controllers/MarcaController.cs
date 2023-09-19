using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class MarcaController : Controller
    {
        // GET: Marca
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarMarca()
        {
            MarcaBL oMarcaBL = new MarcaBL();
            return Json(oMarcaBL.listarMarca(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarMarca(string nombremarca)
        {
            MarcaBL oMarcaBL = new MarcaBL();
            return Json(oMarcaBL.filtrarMarca(nombremarca), JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarMarca(int id)
        {
            MarcaBL obj = new MarcaBL();
            return Json(obj.recuperarMarca(id), JsonRequestBehavior.AllowGet);
        }

        public int guardarMarca(MarcaCLS oMarcaCLS)
        {
            MarcaBL obj = new MarcaBL();
            return obj.guardarMarca(oMarcaCLS);
        }

        public int eliminarMarca(int id)
        {
            MarcaBL obj = new MarcaBL();
            return obj.eliminarMarca(id);
        }

    }
}