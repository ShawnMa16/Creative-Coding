goToInitPos = (breaky) => {
    if(breaky.initX != breaky.body.pos.x) {
        breaky.body.pos.x -= 1;
    }
};