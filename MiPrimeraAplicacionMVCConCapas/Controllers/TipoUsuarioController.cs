using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class TipoUsuarioController : Controller
    {
        // GET: TipoUsuario
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarTipoUsuario()
        {
            TipoUsuarioBL oTipoUsuarioBL = new TipoUsuarioBL();
            return Json(oTipoUsuarioBL.listarTipoUsuario(),
                JsonRequestBehavior.AllowGet);
        }
    }
}