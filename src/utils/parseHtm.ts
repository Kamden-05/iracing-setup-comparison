import * as cheerio from "cheerio";
import type { Cheerio } from "cheerio";
import type { Element } from "domhandler";
import type { SetupItem, SetupCategory, Setup } from "../types/seutp";

export default async function parseHtm(setup: File) {
  const html = await setup.text();
  const $ = cheerio.load(html);

  // extract names

  const $header = $("h2:first");
  const [car, setupName, trackName] = getSetupHeaders($, $header);

  const $categories = $("h2");
  const setupValues = getCategories($, $categories);

  const setupData: Setup = {
    carName: car,
    setupName: setupName,
    trackName: trackName,
    categories: setupValues,
  };
  return setupData;
}

function getCategories($: cheerio.CheerioAPI, headers: Cheerio<Element>) {
  const categories: SetupCategory[] = [];
  let currentCategory: SetupCategory | null = null;
  let currentItem: SetupItem | null = null;

  headers.each((index: number, el) => {
    if (index === 0) return;

    const uTags = $(el).nextUntil("h2").filter("u");

    if (uTags.length === 0) return;

    const text = $(el).text().split(":")[0].trim();

    currentCategory = {
      name: text,
      items: [],
    };

    categories.push(currentCategory);

    uTags.each((_, u) => {
      const prev = u.prev;

      if (prev && prev.type === "text" && prev.data.includes(":")) {
        currentItem = {
          name: prev.data.trim().split(":")[0],
          values: [],
        };

        currentCategory!.items.push(currentItem);
      }

      if (!currentItem) return;

      currentItem.values.push(u.firstChild!.data);
    });
  });
  return categories;
}

function getSetupHeaders($: cheerio.CheerioAPI, header: Cheerio<Element>) {
  const textNodes = header.contents().filter((_, el) => {
    return el.type === "text";
  });

  const rawCarAndSetup = textNodes[1].data;
  const rawTrack = textNodes[2].data;

  const [rawCar, rawSetup] = rawCarAndSetup.split("setup:");

  const car = rawCar.trim();
  const setup = rawSetup.trim();
  const track = rawTrack.split(":")[1].trim();

  return [car, setup, track];
}
