import {useCallback} from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
SQLite.DEBUG(true);

SQLite.enablePromise(true);

export const useAccountBookHistoryItem = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    return await SQLite.openDatabase(
      {
        name: 'account.db',
        createFromLocation: '~www/account_db.db',
        location: 'default',
      },
      () => {
        console.log('open success');
      },
      failed => {
        console.error(failed);
      },
    );
  }, []);
  return {
    insertItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(
      async item => {
        console.log(item);
        const db = await openDB();

        const now = new Date().getTime();

        const result = await db.executeSql(
          `INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) 
         VALUES (
          "${item.type}", 
          ${item.price}, 
          "${item.comment}",
          "${item.date}", 
          ${item.photoUrl ? `"${item.photoUrl}"` : null},
          "${now}", 
          "${now}"
        )`,
        );

        console.log(result);

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),

    updateItem: useCallback(async (item: AccountBookHistory) => {
      console.log(item);
    }, []),
  };
};
