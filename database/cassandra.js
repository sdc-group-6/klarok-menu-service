const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'sdc',
});

const getMenu = (params) => {
  const query = 'SELECT * FROM menu WHERE restaurant_id = ?';
  return client.execute(query, params, { prepare: true })
    .then((menu) => {
      return menu.rows.map((item) => {
        item.required = JSON.parse(item.required);
        item.optional = JSON.parse(item.optional);
        return item;
      });
    })
    .catch(err => console.log('ERROR GETTING ITEM', err));
};

const getItem = (params) => {
  const query = 'SELECT * FROM menu WHERE restaurant_id = ? AND item_id = ?';
  return client.execute(query, params, { prepare: true })
    .then(menu => menu.rows[0])
    .then((item) => {
      item.required = JSON.parse(item.required);
      item.optional = JSON.parse(item.optional);
      return item;
    })
    .catch(err => console.log('ERROR GETTING ITEM', err));
};

module.exports = {
  getMenu,
  getItem,
};
