import { Router } from "express";
import userController from "../controllers/user.controller.js";
import middleware from "../middlewares/middleware.js";

const router = Router();
const { verifyAccessToken } = middleware;

// router.get("/:id", userController.getUserById);

// router.patch("/update/:id", userController.updateUserById);
// router.delete("/delete/:id", userController.deleteUser);
router.get('/ngo/search', async(req, res, next)=>{
    res.json({
        "count": 30,
        "category": "Human Rights",
        "location_preference": "global",
        "organisation_scale": "medium",
        "ngo_list": [
            {
                "_id": {"$oid": "6164cb4c4f4db3c3e7e70457"},
                "name": "Amnesty International",
                "description": "Amnesty International is a global human rights organization that advocates for the rights of individuals worldwide.",
                "location": "London, United Kingdom",
                "website": "https://www.amnesty.org/",
                "logo": "https://www.amnesty.org/content/assets/img/logo/ai-logo-cyan-blue.png"
            },
            {
                "_id": {"$oid": "6164cb5a4f4db3c3e7e70458"},
                "name": "Human Rights Watch",
                "description": "Human Rights Watch is an international non-governmental organization that conducts research and advocacy on human rights.",
                "location": "New York, United States",
                "website": "https://www.hrw.org/",
                "logo": "https://www.hrw.org/sites/all/themes/hrw/logo.png"
            },
            {
                "_id": {"$oid": "6164cb694f4db3c3e7e70459"},
                "name": "Oxfam International",
                "description": "Oxfam International is a confederation of 20 independent charitable organizations that focus on fighting poverty and promoting social justice.",
                "location": "Oxford, United Kingdom",
                "website": "https://www.oxfam.org/",
                "logo": "https://www.oxfam.org/themes/custom/oxfam/assets/img/logo.png"
            },
            {
                "_id": {"$oid": "6164cb7e4f4db3c3e7e7045a"},
                "name": "Doctors Without Borders",
                "description": "Médecins Sans Frontières (MSF), also known as Doctors Without Borders, is an international humanitarian medical organization that provides emergency medical aid in situations of conflict, disaster, and poverty.",
                "location": "Geneva, Switzerland",
                "website": "https://www.msf.org/",
                "logo": "https://www.msf.org/themes/custom/msf/logo.svg"
            },
            {
                "_id": {"$oid": "6164cb944f4db3c3e7e7045b"},
                "name": "International Committee of the Red Cross",
                "description": "The International Committee of the Red Cross (ICRC) is a humanitarian organization that provides assistance and protection to victims of armed conflict and other situations of violence.",
                "location": "Geneva, Switzerland",
                "website": "https://www.icrc.org/",
                "logo": "https://www.icrc.org/assets/images/layout/ICRC_logo_EN.svg"
            },
            {
                "_id": {"$oid": "6164cba64f4db3c3e7e7045c"},
                "name": "Transparency International",
                "description": "Transparency International is a non-governmental organization that monitors and publicizes corporate and political corruption in international development.",
                "location": "Berlin, Germany",
                "website": "https://www.transparency.org/",
                "logo": "https://www.transparency.org/assets/images/logo-ti.svg"
            },
            {
                "_id": {"$oid": "6164cbb54f4db3c3e7e7045d"},
                "name": "Human Rights First"
            }]
        })
})

export default router;
