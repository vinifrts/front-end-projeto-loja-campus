import Navbar  from "../components/layout/Navbar";
import Footer  from "../components/layout/Footer";
import HomePage      from "../pages/HomePage";
import ProductsPage  from "../pages/ProductsPage";
import ProductPage   from "../pages/ProductPage";
import LoginPage     from "../pages/LoginPage";
import CartPage      from "../pages/CartPage";
import AdminPage     from "../pages/AdminPage";
import SobrePage     from "../pages/SobrePage";

export default function AppRoutes({ page, setPage, selectedProduct, setSelectedProduct }) {
  const noLayout = page === "login";

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "produtos":
        return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "produto":
        return (
          <ProductPage
            product={selectedProduct}
            setPage={setPage}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case "login":
        return <LoginPage setPage={setPage} />;
      case "cart":
        return <CartPage setPage={setPage} />;
      case "admin":
        return <AdminPage setPage={setPage} />;
      case "sobre":
        return <SobrePage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {!noLayout && <Navbar setPage={setPage} currentPage={page} />}
      <main className={!noLayout ? "pt-16" : ""}>{renderPage()}</main>
      {!noLayout && <Footer setPage={setPage} />}
    </div>
  );
}