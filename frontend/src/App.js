import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./screens/HomeView";
import ProductView from "./screens/ProductView";
import CartView from "./screens/CartView";
import LoginView from "./screens/LoginView";
import RegisterView from "./screens/RegisterView";
import ProfileView from "./screens/ProfileView";
import ShippingView from "./screens/ShippingView";
import PaymentView from "./screens/PaymentView";
import PlaceOrderView from "./screens/PlaceOrderView";
import OrderView from "./screens/OrderView";
import UserListView from "./screens/admin screens/UserListView";
import UserEditView from "./screens/UserEditView";
import ProductListView from "./screens/admin screens/ProductListView";
import ProductEditView from "./screens/admin screens/ProductEditView";
import OrderListView from "./screens/OrderListView";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderView} />
          <Route path="/shipping" component={ShippingView} />
          <Route path="/payment" component={PaymentView} />
          <Route path="/placeorder" component={PlaceOrderView} />
          <Route path="/login" component={LoginView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/profile" component={ProfileView} />
          <Route path="/product/:id" component={ProductView} />
          <Route path="/cart/:id?" component={CartView} />
          <Route path="/admin/userlist" component={UserListView} />
          <Route path="/admin/user/:id/edit" component={UserEditView} />
          <Route path="/admin/productlist" component={ProductListView} exact />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListView}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditView} />
          <Route path="/admin/orderlist" component={OrderListView} />
          <Route path="/search/:keyword" component={HomeView} exact />
          <Route path="/page/:pageNumber" component={HomeView} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeView}
            exact
          />
          <Route path="/" component={HomeView} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
