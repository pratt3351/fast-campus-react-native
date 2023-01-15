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
          ${item.date}, 
          ${item.photoUrl ? `"${item.photoUrl}"` : null},
          ${now}, 
          ${now}
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
        getItem: useCallback<() => Promise<AccountBookHistory[]>>(async () => {
            console.log('onPress');
            const db = await openDB();
            const result = await db.executeSql('SELECT * FROM account_history');

            const items: AccountBookHistory[] = [];
            const size = result[0].rows.length;

            for (let i = 0; i < size; i++) {
                const item = result[0].rows.item(i);
                console.log(item);
                //{"comment": "sadfasdfsadfsadf", "created_at": "1671006724878", "date": "1671764400000", "id": 1, "photo_url": null, "price": 10000, "type": "사용", "updated_at": "1671006724878"}
                items.push({
                    type: item.type,
                    comment: item.comment,
                    createdAt: parseInt(item.created_at),
                    updatedAt: parseInt(item.updated_at),
                    date: parseInt(item.date),
                    id: item.id,
                    photoUrl: item.photo_url,
                    price: parseInt(item.price),
                });
            }

            return items.sort((a, b) => a.date - b.date);
        }, [openDB]),

        updateItem: useCallback<
            (item: AccountBookHistory) => Promise<AccountBookHistory>
        >(
            async item => {
                if (typeof item.id === 'undefined') {
                    throw new Error('unexpected id value');
                }
                const db = await openDB();

                const now = new Date().getTime();
                //UPDATE USERDATA_T SET USERNAME='충훈', USERAGE=30 WHERE ID=1

                const result = await db.executeSql(
                    `UPDATE account_history 
         SET price=${item.price}, 
         comment="${item.comment}", 
         date=${item.date}, 
         photo_url=${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
         updated_at=${now}
         WHERE id=${item.id} 
        `,
                );

                console.log(item);

                return {
                    ...item,
                    id: result[0].insertId,
                };
            },
            [openDB],
        ),
    };
};
