using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class CategoriaController : Controller
    {
        // GET: Categoria
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarCategoria()
        {
            CategoriaBL oCategoriaBL = new CategoriaBL();
            return Json(oCategoriaBL.listarCategoria(), JsonRequestBehavior.AllowGet);
        }
    }
}