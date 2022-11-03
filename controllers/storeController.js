import express from "express";
import request from "request";
import cheerio from "cheerio";
import insertData from "./DatabaseAPI.js";

const router = express.Router();
export let result = []
export let linkToko = ''


export const getStore = async (req, res) => {
  let { name } = req.body;

  insertData(name);
  name = name
   .slice(26)
   .trim()
   .replace(/[0-9]/g, "")
   .replace(/['/-[\]']+/g, "");

  name = `https://www.tokopedia.com/${name}/product?sort=2`;
  linkToko = name;
  result = [] // this for emptying container, everytime request is made

  request(`${linkToko}`, async function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const listItems = $('[data-testid="master-product-card"]');

      listItems.each((idx, el) => {
        let nama = $('[data-testid="linkProductName"]', el).text();
        let harga = $('[data-testid="linkProductPrice"]', el).text();
        let link = $("a[href]", el).attr("href");

        result = [
          ...result,
          {
            number: idx,
            nama: nama,
            harga: harga,
            img: null,
            link: link,
            date: null,
          },
        ];
      });

      console.log("berhasil");
      res.send(result)

    } else {
      console.log("error");
      res.status(400).send("error");
    }
  });
    

};

export default router;
