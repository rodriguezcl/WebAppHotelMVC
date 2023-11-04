using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Capa_Negocio;
using Capa_Entidad;
namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class PaginaController : Controller
    {
        // GET: Pagina
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarPaginas()
        {
            PaginaBL oPaginaBL = new PaginaBL();
            return Json(oPaginaBL.listarPagina(),
                JsonRequestBehavior.AllowGet);
        }

    }
}