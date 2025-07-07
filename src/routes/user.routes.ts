import { Router } from "express";

const router = Router();

router.route('/').get().post();

router.route('/:userId').get().delete();

module.exports = router;
