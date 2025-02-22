const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//insert a new customer
const createCustomer = async (req, res) => {
    const { customer_id, first_name, last_name, address, email, phone_number } = req.body;
    try {
        const customer = await prisma.customers.create({
            data: {
                customer_id,
                first_name,
                last_name,
                address,
                email,
                phone_number
            }
        });
        res.status(200).json({
            status: "ok",
            message: `User with id ${customer_id} created successfully`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error creating user",
            error: err.message,
        });
    }
};

// get all customers

const getCustomers = async (req, res) => {
    const cust = await prisma.customers.findMany();
    res.json(cust);
}

//get customer by id
const getCustomersById = async (req, res) => {
    const id =req.params.id;
    try {
        const custs = await prisma.customers.findUnique({
            where:{
                customer_id: parseInt(id)
            },});
            if(!custs){
                res.status(404).json({ 'message': 'Customer not found' });
            }else {
                res.status(200).json(custs);
            }
    }catch(err){
        res.status(500).json(err);
    }
}

//delete a customer
const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const exisingCustomer = await prisma.customers.findUnique({
            where: {
                customer_id: Number(id)
            },
    });
    if(!exisingCustomer){
        res.status(404).json({ 'message': 'Customer not found' });
    }
    await prisma.customers.delete({
        where: {
            customer_id: Number(id)
        },
    });
    res.status(200).json({
        status: "ok",
        message: `Customer with id ${id} deleted successfully`, 
    });
}catch(err){
    res.status(500).json(err);
};
}

//update a customer
const updateCustomer = async (req, res) => {
    const {id} = req.params;
    const {first_name, last_name, address, email, phone_number} = req.body;
    const data = {};
    if(first_name){data.first_name = first_name;}
    if(last_name){data.last_name = last_name;}
    if(address){data.address = address;}
    if(email){data.email = email;}
    if(phone_number){data.phone_number = phone_number;}

    if(Object.keys(data).length === 0){
        res.status(400).json({
            status: 'error',
            message: 'No fields to update'
        });
        }
    try{
        const custs = await prisma.customers.update({
            data,
            where:{
                customer_id: Number(id)
            },
    });
    res.status(200).json({
        status: 'ok',
        message: `Customer with id ${id} updated successfully`,
        user: custs
    });
    }catch(err){
        if (err.code === 'P2002') {
            res.status(400).json({
                status: 'error',
                message: 'Customer with that ID does not exist'
            });
        }else if (err.code === 'P2025') {
            res.status(400).json({
                status: 'error',
                message: `User with id=${id} not found`
            });
    }else {
        console.error('Update customer error', err);
        res.status(500).json({
            status: 'error',
            message: 'Error updating user',
            // error: err.message
        });
    }
}
}
module.exports = {
    createCustomer, getCustomers, getCustomersById, deleteCustomer, updateCustomer
};