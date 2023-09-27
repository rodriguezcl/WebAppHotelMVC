using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
  public   class ProductoBL
    {

        public List<ProductoCLS> filtrarProductos(string nombre)
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.filtrarProductos(nombre);
        }

        public List<ProductoCLS> listarProductos()
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.listarProductos();
        }
        public List<ProductoCLS> filtrarProductoPorCategoria(int iidcategoria)
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.filtrarProductoPorCategoria(iidcategoria);
        }
        public List<ProductoCLS> filtrarProductoPorMarca(int iidmarca)
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.filtrarProductoPorMarca(iidmarca);
        }

        public ProductoMarcaCLS listarProductoMarca()
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            MarcaDAL oMarcaDAL = new MarcaDAL();
            CategoriaDAL oCategoriaDAL = new CategoriaDAL();
            ProductoMarcaCLS oProductoMarcaCLS = new ProductoMarcaCLS();
            oProductoMarcaCLS.listaProducto = oProductoDAL.listarProductos();
            oProductoMarcaCLS.listaMarca = oMarcaDAL.listarMarca();
            oProductoMarcaCLS.listaCategoria = oCategoriaDAL.listarCategoria();

            return oProductoMarcaCLS;
        }


        //public ProductoCategoriaCLS listarProductoCategoria()
        //{
        //    ProductoDAL oProductoDAL = new ProductoDAL();
        //    CategoriaDAL oCategoriaDAL = new CategoriaDAL();
        //    ProductoCategoriaCLS oProductoCategoriaCLS = new ProductoCategoriaCLS();
        //    oProductoCategoriaCLS.listaProducto = oProductoDAL.listarProductos();
        //    oProductoCategoriaCLS.listaCategoria = oCategoriaDAL.listarCategoria();

        //    return oProductoCategoriaCLS;
        //}



    }
}
