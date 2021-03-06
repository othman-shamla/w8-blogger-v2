const { getposts } = require('./../database/queries/getData');

exports.get = (req, res) => {
  let id = false;
  let name = 'Guest';
  if (req.userAuth) {
    name = req.jwt.name;
    id = false;
  } else {
    id = true;
  }
  getposts()
    .then((result) => {
      result.rows.forEach((row, index) => {
        const obj = {
          post_id: row.post_id,
          post_name: row.user_name,
          post_body: row.post_body,
        };
        obj.comments = row.comment_body.map((value, index) => ({
          comment_body: value,
          name: row.name[index],
        }));
        result.rows[index] = obj;
      });
      const object = result.rows;
      res.render('home', { obj: object, id: id, name, css: 'style' });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};
