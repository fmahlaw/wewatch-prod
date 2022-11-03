import express from "express";
import puppeteer from "puppeteer";
import { result, linkToko } from "./storeController.js";

const router = express.Router();

let [berhasil, gagal] = [0,0]

export const getAdditionalData = async (req, res) => {
  
  console.log("masuk Pak eko");
  
    (async function addData() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        );

      await page.goto(`${linkToko}`);
      const resultsSelector = "[decoding]";
      await page
        .waitForSelector(resultsSelector,{waitUntil: 'load', timeout: 10000})
       

      const links = await page.evaluate((resultsSelector) => {
        return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
          return `${anchor.src}`;
        });
      }, resultsSelector);

      let tanggalItem = [];

      links.map((item) => {
        if (!item.includes("assets")) {
          tanggalItem = [
            ...tanggalItem,
            item.slice(item.indexOf(20, 50), item.lastIndexOf("/")),
          ];
        } else {
          tanggalItem.push("not found");
        }
      });

      const tanggalEdit = [];
      tanggalItem.map((item) => {
        if (item[0] == "2") {
          if (item.length === 10) {
            tanggalEdit.push(
              item[8] +
                item[9] +
                "-" +
                item[5] +
                item[6] +
                "-" +
                item[0] +
                item[1] +
                item[2] +
                item[3]
            );
          } else if (item.length === 9) {
            if (item[6] == "/") {
              tanggalEdit.push(
                item[7] +
                  item[8] +
                  "-" +
                  item[5] +
                  "-" +
                  item[0] +
                  item[1] +
                  item[2] +
                  item[3]
              );
            } else if (!(item[6] == "/")) {
              tanggalEdit.push(
                item[8] +
                  "-" +
                  item[5] +
                  item[6] +
                  "-" +
                  item[0] +
                  item[1] +
                  item[2] +
                  item[3]
              );
            }
          } else if (item.length === 8) {
            tanggalEdit.push(
              item[7] +
                "-" +
                item[5] +
                "-" +
                item[0] +
                item[1] +
                item[2] +
                item[3]
            );
          }
        } else {
          tanggalEdit.push("not found");
        }
      });

      let resultAkhir = [];
      result.map((item, index) => {
        resultAkhir.push({
          ...item,
          img: links[index],
          date: tanggalEdit[index],
        });
      });

     res.send(resultAkhir);
     await browser.close();
    })().then(() => { berhasil++
       console.log(`pencarian berhasil ${berhasil} `)},
    (error) => { gagal++
      console.log(`pencarian gagal ${gagal}`);
    }
  );;
};

export default router;
