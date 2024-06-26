export const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

export const priceFormat = (price) => {
  const formated = new Intl.NumberFormat("fa-IR").format(price);
  return formated;
};
