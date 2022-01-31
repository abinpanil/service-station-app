import Jobcard from "../models/jobcardModel.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose';
import Customer from "../models/customerModel.js";

const ObjectId = mongoose.Types.ObjectId;


// @desc Create new Jobcard
// @Route POST /jobcard
// @access Private
const createJobcard = asyncHandler(async (req, res) => {
    const { name, mobile, user_id, reg_no, vehicle_make, vehicle_model } = req.body;

    if (!name || !mobile || !user_id || !reg_no || !vehicle_make || !vehicle_model) {
        res.status(401)
        throw new Error('Fill all fields');
    }

    let customer = await Customer.findOne({ name: name, mobile_no: mobile });
    if (!customer) {
        const existingMobile = await Customer.exists({ mobile_no: mobile });
        if (existingMobile) {
            res.status(400);
            throw new Error('Mobile number is alreay used another customer');
        }
        const newCustomer = new Customer({
            name, mobile_no: mobile
        });
        customer = await newCustomer.save();
    }

    const newJobcard = new Jobcard({
        creation_user: user_id, customer_id: customer._id, reg_no, vehicle_make, vehicle_model
    })
    const jobcard = await newJobcard.save();

    res.json(jobcard);

})


// @desc Fetch jobcard using user id
// @Route GET /jobcard
// @access Private
const getJobcard = asyncHandler(async (req, res) => {
    let { customer_id, status, page, jobcard_id } = req.query;
    if (!status) status = 3
    status = parseInt(status);
    if (!page) page = 1
    page = page * 10 - 10;
    console.log(jobcard_id, "page:" + page);
    let jobcard

    // fetching all jobcard
    if (!customer_id && !jobcard_id && status === 3) {
        jobcard = await Jobcard.aggregate([
            {
                $skip: page
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creation_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "issues",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "issues"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "items"
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "payment"
                }
            }
        ])
        console.log(jobcard);
        if (!jobcard.length) {
            res.status(401)
            throw new Error('No jobcard found');
        }
        let count = await Jobcard.find().count();
        res.json({ jobcard: jobcard, count: count });
    }

    // fetching all jobcard filter status
    if (!customer_id && !jobcard_id) {
        jobcard = await Jobcard.aggregate([
            {
                $match: { jobcard_status: status }
            },
            {
                $skip: page
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creation_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "issues",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "issues"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "items"
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "payment"
                }
            }
        ])
        if (!jobcard.length) {
            res.status(401)
            throw new Error('No jobcard found');
        }
        let count = await Jobcard.find({ jobcard_status: status }).count();
        res.json({ jobcard: jobcard, count: count });
    }

    // feching a particular job card
    if (jobcard_id) {
        jobcard = await Jobcard.aggregate([
            {
                $match: { _id: ObjectId(jobcard_id), isActive: true }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creation_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "issues",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "issues"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "items"
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "payment"
                }
            }
        ]);
        if (!jobcard.length) {
            res.status(401)
            throw new Error('No jobcard found');
        }
        console.log(jobcard);
        res.json(jobcard[0]);
    }

    // fetching all jobcards of a user
    if (customer_id && status === 3) {
        jobcard = await Jobcard.aggregate([
            {
                $match: { customer_id: ObjectId(customer_id), isActive: true }
            },
            {
                $skip: page
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creation_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "issues",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "issues"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "items"
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "payment"
                }
            }
        ]);
        if (!jobcard.length) {
            res.status(401)
            throw new Error('No jobcard for this customer');
        }
        let count = await Jobcard.find({ customer_id: ObjectId(customer_id), isActive: true }).count();
        res.json({ jobcard: jobcard, count: count });
    }

    // fetching jobcard of user
    if (customer_id) {
        jobcard = await Jobcard.aggregate([
            {
                $match: { customer_id: ObjectId(customer_id), isActive: true }
            },
            {
                $match: { jobcard_status: status }
            },
            {
                $skip: page
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creation_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "issues",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "issues"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "items"
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "jobcard_id",
                    as: "payment"
                }
            }
        ]);
        if (!jobcard.length) {
            res.status(401)
            throw new Error('No jobcard for this customer');
        }
        let count = await Jobcard.find({ customer_id: ObjectId(customer_id), jobcard_status: status, isActive: true }).count();
        res.json({ jobcard: jobcard, count: count });
    }

})


// @desc Delete jobcard
// @Route DELETE /jobcard
// @access Private
const deleteJobcard = asyncHandler(async (req, res) => {
    const { jobcard_id } = req.query;

    const deleteJobcard = await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, { isActive: false });
    res.json(deleteJobcard);
})


// @desc Change Job status
// @Route PUT /jobcard
// @access private
const changeJobStatus = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, status } = req.body;
    const date = new Date();

    let changeStatus

    if (status === 1) changeStatus = await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, {
        completion_date: date,
        completion_user: user_id,
        jobcard_status: status
    })

    if (status === 2) {
        const jobcard = await Jobcard.findOne({ _id: ObjectId(jobcard_id) });
        if (jobcard.payable_amount != 0) {
            res.status(401)
            throw new Error('Complete payment before delivery');
        }
        changeStatus = await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, {
            delivery_date: () => Date.now(),
            delivery_date: user_id,
            jobcard_status: status
        })
    }

    res.json(changeStatus);
})



export {

    createJobcard,
    getJobcard,
    deleteJobcard,
    changeJobStatus,

}