
exports.up = function(knex) {
    return knex.schema.createTable('leitura', function (table) {
        table.increments();
        table.string('id_passado');
        table.string('nome');
        table.string('valor');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('leitura')
};
