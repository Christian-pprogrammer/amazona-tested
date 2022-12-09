const Order = require("../models/OrderModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.should();
 
chai.use(chaiHttp);
 
describe("Orders", () => {
  beforeEach((done) => {
    Order.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET Orders", () => {
    it("it should GET all orders", (done) => {
      chai
        .request(app)
        .get("/api/orders")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST order", () => {
    it("it should POST an order", (done) => {
      let order = {
        itemsPrice:$400,
        shippingPrice:$9,
        taxPrice:$2,
        totalPrice:$415,
        user:"chriss",
        isPaid:false,
        isDelivered:true
        };
      chai
        .request(app)
        .post("/api/orders")
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id order", () => {
    it("it should GET an order by the id", (done) => {
      let order = new Order({
          itemsPrice:$400,
          shippingPrice:$9,
          taxPrice:$2,
          totalPrice:$415,
          user:"chriss",
          isPaid:false,
          isDelivered:true
     
    });
      order.save((err, order) => {
        chai
          .request(app)
          .get("/api/orders/" + order.id)
          .send(order)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id order", () => {
    it("it should UPDATE a order given the id", (done) => {
      let order = new Order({
        itemsPrice:$400,
        shippingPrice:$9,
        taxPrice:$2,
        totalPrice:$415,
        user:"chriss",
        isPaid:false,
        isDelivered:true
    
    });
      order.save((err, order) => {
        console.log(order.id);
        chai
          .request(app)
          .put("/api/orders/" + order.id)
          .send({
            itemsPrice:$410,
            shippingPrice:$19,
            taxPrice:$5,
            totalPrice:$425,
            user:"chriss",
            isPaid:false,
            isDelivered:true
           })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id order", () => {
    it("it should DELETE a order given the id", (done) => {
      let order = new order({
        itemsPrice:$400,
        shippingPrice:$9,
        taxPrice:$2,
        totalPrice:$415,
        user:"james",
        isPaid:false,
        isDelivered:true
        });
      order.save((err, order) => {
        chai
          .request(app)
          .delete("/api/orders/" + order.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});