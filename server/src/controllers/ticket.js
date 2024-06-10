import Ticket from "../models/Ticket.js";

const controller = {};

controller.create = async (req, res) => {
    try {
      const ticket = req.body;

      // Converter a string de data em um objeto Date:
      ticket.data = new Date(ticket.data);

      const ticketCriado = await Ticket.create(ticket);
      res.status(201).json(ticketCriado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

controller.retrieveAll = async function(req, res) {
    try {
        const query = Ticket.find().sort({data: 1}); 
        const result = await query.exec()
        if (result) {
            res.send(result); 
        } else {
            res.status(404).send('Nenhum ticket encontrado'); 
        }
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
};

controller.retrieveOneId = async function(req, res) {
    try {

        const query = Ticket.findById(req.params.id)

        if('pop_categoria' in req.query) query.populate('categoria')

        if('pop_analista' in req.query) query.populate('analista')

        const result = await query.exec()

        if (result) {
            res.send(result); 
        } else {
            res.status(404).send('Nenhum ticket encontrado'); 
        }         
    } 
    catch (error) {
        console.error(error);

        res.status(500).end();
    } 
};

controller.update = async function(req, res) {
    try {
        const ticket = await Ticket.findById(req.params.id);
  
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket não encontrado' });
        } else {
            if (req.body.nomeSala) {
                ticket.nomeSala = req.body.nomeSala;
            }
    
            if (req.body.solicitante) {
                ticket.solicitante = req.body.solicitante;
            }
    
            if (req.body.descrição) {
                ticket.descrição = req.body.descrição;
            }
            
            if (req.body.dataAtualizacao) {
                ticket.dataAtualizacao = req.body.dataAtualizacao;
            }
          
            if (req.body.status) {
                ticket.status = req.body.status;
            }
    
            if (req.body.tipoProblema) {
                ticket.tipoProblema = req.body.tipoProblema;
            }
        }

        

        await ticket.save();
  
        res.status(200).json(ticket);

    } catch (error) {
        console.error('Erro ao atualizar o ticket:', error);
        es.status(500).json({ error: 'Erro interno do servidor' });
    }
  };


controller.delete = async function(req, res) {
    try {
        const result = await Ticket.findByIdAndDelete(req.params.id)    
        if(result) res.status(200).send('Ticket excluído com sucesso').end()
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).end()
    }

};

export default controller;