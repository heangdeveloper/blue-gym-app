import type { NextApiRequest, NextApiResponse } from "next";

const data = [
    { id: "1", name: "1 month", duration: 30, price: 29.99, description: "Access to all gym facilities for one month.", status: "active" },
    { id: "2", name: "3 months", duration: 90, price: 79.99, description: "Save more with a 3-month membership plan.", status: "active" },
    { id: "3", name: "6 months", duration: 180, price: 149.99, description: "Half-year access with discounted pricing.", status: "active" },
    { id: "4", name: "1 year", duration: 365, price: 249.99, description: "Full-year membership with best value.", status: "active" },
    { id: "5", name: "Weekly Pass", duration: 7, price: 9.99, description: "Short-term access for one week.", status: "active" },
    { id: "6", name: "Day Pass", duration: 1, price: 3.99, description: "One-day access to gym facilities.", status: "active" },
    { id: "7", name: "Premium 1 Month", duration: 30, price: 49.99, description: "Includes personal trainer and group classes.", status: "active" },
    { id: "8", name: "VIP Annual", duration: 365, price: 399.99, description: "VIP access with all facilities, classes, and priority support.", status: "active" },
    { id: "9", name: "Student Plan", duration: 30, price: 19.99, description: "Discounted monthly plan for students.", status: "active" },
    { id: "10", name: "Couple Plan (1 Month)", duration: 30, price: 54.99, description: "Special package for two people.", status: "inactive" },
    { id: "11", name: "Family Plan (1 Month)", duration: 30, price: 79.99, description: "Access for up to 4 family members with full facilities.", status: "active" },
    { id: "12", name: "Personal Training Pack", duration: 30, price: 99.99, description: "Includes gym access plus 8 personal training sessions.", status: "active" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(data);
}