import moment from "moment";
export const getDayRange = (startDate, endDate) => {
    let days = [];
    let dateStart = moment(startDate);
    let dateEnd = moment(endDate);
  
    while (dateEnd.valueOf() > dateStart.valueOf()) {
      days.unshift(dateStart.format("DD_MM_YYYY"));
      dateStart.add(1, "day");
    }
    return days;
  };
  
  export const getListCollectionDay = () => {
    let days = [];
    let now = moment();
    days.push(now.format("DD_MM_YYYY"));
    for (let index = 0; index < 7; index++) {
      now = now.subtract(1, "days");
      days.push(now.format("DD_MM_YYYY"));
    }
    return days;
  };

  
//   export  const getFilterDate = async (shop, startDate, endDate) => {
//     let timezone = 0;
//     if (!startDate || !endDate) {
//       let tz = await cache.getCache(cache.PATH.TZ);
//       if (tz != null) {
//         timezone = tz;
//       } else {
//         let settings = await connectSql.query(
//           "SELECT date_timezone_offset FROM fb_pixel_settings WHERE shop= '" +
//             shop +
//             "'"
//         );
//         if (settings[0]["date_timezone_offset"] != undefined) {
//           let timezone_ = settings[0]["date_timezone_offset"];
//           timezone = timezone_;
//           cache.setCache(cache.PATH.TZ, timezone_);
//         }
//       }
//     }
//     let startDate_ = startDate
//       ? moment(startDate, "YYYY-MM-DD HH:mm:ss").utcOffset(0, true).toDate()
//       : moment().utcOffset(timezone, true).startOf("day").toDate();
//     let endDate_ = endDate
//       ? moment(endDate, "YYYY-MM-DD HH:mm:ss")
//           .utcOffset(0, true)
//           .endOf("day")
//           .toDate()
//       : moment().utcOffset(timezone, true).endOf("day").toDate();
//     return { $gte: startDate_, $lt: endDate_ };
//   };
  