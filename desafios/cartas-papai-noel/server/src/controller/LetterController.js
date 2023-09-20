const db = require('../database/connection');

module.exports = {
    async show(request, response) {
        const { state, city } = request.query;

        if ((!state) || (!city)) {
            return response.status(400).json(
                {
                    success: false,
                    error: 'Os filtros da pesquisa não estão preenchidos.',
                });
        }

        const letters = await db('letters')
                                .where('letters.city', '=', city)
                                .where('letters.state', '=', state);

        return response.status(200).json(letters);
    },
    async create(request, response) {
        const {
            name,
            city,
            state,
            letter,
            whatsapp,
            email
        } = request.body;

        const trx = await db.transaction();

        try {
            await trx('letters').insert({
                name,
                city,
                state,
                letter,
                whatsapp,
                email
            });

            await trx.commit();
            return response.status(200).json(
                {
                    success: true,
                    created: {
                        name,
                        city,
                        state,
                        letter,
                        whatsapp,
                        email
                    }
                });
        }
        catch (err) {
            await trx.rollback();
            return response.status(400).json(
                {
                    success: false,
                    error: 'Não foi possivel criar uma nova carta.',
                    parameters: {
                        name,
                        city,
                        state,
                        letter,
                        whatsapp,
                        email
                    },
                    error_log: err
                });
        }


    }
}