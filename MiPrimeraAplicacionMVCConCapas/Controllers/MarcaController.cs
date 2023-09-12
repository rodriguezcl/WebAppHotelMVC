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

    }
}