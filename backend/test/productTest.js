const Product = require("../models/ProductModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.should();
 
chai.use(chaiHttp);
 
describe("product", () => {
  beforeEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET Products", () => {
    it("it should GET all products", (done) => {
      chai
        .request(app)
        .get("/api/productss")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST product", () => {
    it("it should POST product", (done) => {
      let product = {
          name:"bags",
          slug:"this amazing bag",
          image:"http://image.png",
          brand:"lui vitton",
          category:"bags",
          description:"amazing bags",
          price:$500,
          countInStock:4,
          rating:5,
          numReviews:102
        
    };
      chai
        .request(app)
        .post("/api/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id product", () => {
    it("it should GET an product by the id", (done) => {
      let product = new Product({
        name:"bags",
        slug:"this amazing bag",
        image:"http://image.png",
        brand:"lui vitton",
        category:"bags",
        description:"amazing bags",
        price:$500,
        countInStock:4,
        rating:5,
        numReviews:102
     
    });
      product.save((err, product) => {
        chai
          .request(app)
          .get("/api/products/" + product.id)
          .send(product)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id product", () => {
    it("it should UPDATE a product given the id", (done) => {
      let product = new Product({
        name:"bags",
        slug:"this amazing bag",
        image:"http://image.png",
        brand:"lui vitton",
        category:"bags",
        description:"amazing bags",
        price:$500,
        countInStock:4,
        rating:5,
        numReviews:102
    });
      product.save((err, product) => {
        console.log(product.id);
        chai
          .request(app)
          .put("/api/products/" + product.id)
          .send({
            name: "meonly",
            email: "me@me.com",
            message: "This my updated bid to this car",
            bid:"$140000"
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
  describe("/DELETE/:id product", () => {
    it("it should DELETE a product given the id", (done) => {
      let product = new Product({
        name:"bags",
        slug:"this amazing bag",
        image:"http://image.png",
        brand:"lui vitton",
        category:"bags",
        description:"amazing bags",
        price:$500,
        countInStock:4,
        rating:5,
        numReviews:102
        });
      product.save((err, product) => {
        chai
          .request(app)
          .delete("/api/products/" + product.id)
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