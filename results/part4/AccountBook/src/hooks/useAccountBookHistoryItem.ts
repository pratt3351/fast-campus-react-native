import {useCallback} from 'react';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {AccountBookHisotry} from '../data/AccountBookHistory';

SQLite.enablePromise(true);
SQLite.DEBUG(true);

export const useAccountBookHistoryItem = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    return await SQLite.openDatabase(
      {
        name: 'account_history',
        createFromLocation: '~www/account_history.db',
        location: 'default',
      },
      () => {
        console.log('open success');
      },
      () => {
        console.log('open failure');
      },
    );
  }, []);
  return {
    insertItem: useCallback<
      (item: Omit<AccountBookHisotry, 'id'>) => Promise<AccountBookHisotry>
    >(
      async item => {
        const db = await openDB();
        const now = new Date().getTime();

        const result = await db.executeSql(
          `
                INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at)
                VALUES ( 
                    "${item.type}",
                    ${item.price},
                    "${item.comment}",
                    ${item.date},
                    ${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
                    ${now},
                    ${now}
                )
            `,
        );

        console.log(result);

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),
    getList: useCallback<() => Promise<AccountBookHisotry[]>>(async () => {
      const db = await openDB();
      const result = await db.executeSql('SELECT * FROM account_history');
      const items: AccountBookHisotry[] = [];
      const size = result[0].rows.length;

      for (let i = 0; i < size; i++) {
        const item = result[0].rows.item(i);

        items.push({
          type: item.type,
          comment: item.comment,
          createdAt: parseInt(item.created_at),
          updatedAt: parseInt(item.updated_at),
          date: parseInt(item.date),
          id: parseInt(item.id),
          photoUrl: item.photo_url,
          price: parseInt(item.price),
        });
      }

      return items.sort((a, b) => a.date - b.date);
    }, [openDB]),
    updateItem: useCallback<
      (item: AccountBookHisotry) => Promise<AccountBookHisotry>
    >(
      async item => {
        if (typeof item.id === 'undefined') {
          throw Error('unexpected id value');
        }

        const db = await openDB();

        const now = new Date().getTime();

        const result = await db.executeSql(
          `
            UPDATE account_history
            SET price=${item.price},
                comment="${item.comment}",
                date=${item.date},
                photo_url=${
                  item.photoUrl !== null ? `"${item.photoUrl}"` : null
                },
                updated_at=${now},
                date=${item.date}
            WHERE id=${item.id}
        `,
        );

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),
    getMontlyAverage: useCallback<
      () => Promise<{month: number; data: number[]}[]>
    >(async () => {
      const now = new Date();
      const currentMonthStart = new Date();
      currentMonthStart.setDate(1);

      const prevMonthList = [2, 1].map(monthDiff => {
        const date = new Date();
        date.setMonth(now.getMonth() - monthDiff);
        date.setDate(1);

        return date.getTime();
      });

      const queryMonth = prevMonthList.concat([
        currentMonthStart.getTime(),
        now.getTime(),
      ]);
      const result: {month: number; data: number[]}[] = [];

      const db = await openDB();
      //[10월 시작, 11월 시작, 12월 시작, 오늘]
      for (let i = 0; i < queryMonth.length - 1; i++) {
        const start = queryMonth[i];
        const end = queryMonth[i + 1];

        const usedPriceResult = await db.executeSql(
          `
            SELECT SUM(price)
            FROM account_history
            WHERE date>=${start} AND date<${end} AND type=\"사용\"
            `,
        );

        const savedPriceResult = await db.executeSql(
          `
            SELECT SUM(price)
            FROM account_history
            WHERE date>=${start} AND date<${end} AND type=\"수입\"
            `,
        );

        const usedPrice = usedPriceResult[0].rows.item(0)['SUM(price)'];
        const savedPrice = savedPriceResult[0].rows.item(0)['SUM(price)'];

        result.push({
          month: new Date(start).getMonth(),
          data: [usedPrice, savedPrice],
        });
      }

      return result;
    }, [openDB]),
  };
};
