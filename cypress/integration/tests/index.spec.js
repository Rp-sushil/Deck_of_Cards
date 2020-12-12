import '@4tw/cypress-drag-drop';

it('should be 52 cards and all cards should be draggable', () =>{
    cy.visit('./index.html');
    for(let i = 0; i < 52; i++){
        cy.get(`#${i}`).should('exist');
        cy.get(`#${i}`).invoke('attr', 'draggable').should('contain', 'true')
    }
})

it('should be 4-card-Holders and should not be draggable', () =>{
    cy.visit('./index.html');
    for(let i = 100; i < 104; i++){
        cy.get(`#${i}`).should('exist');
        cy.get(`#${i}`).invoke('attr', 'draggable').should('not.exist')
    }
})

it('cards should be shuffled', () =>{
    cy.visit('./index.html')
    for(let i = 0; i < 52; i++){
        cy.get(`#${i}`).invoke('attr', 'pos').should('not.contain', `#${i}`)
    }
})

it('should dragndrop', () => {
    cy.visit('/index.html')
    cy.get('#0').drag('#100');
    cy.get('#0').should('not.exist');
    cy.get('#100').should('exist');
})

it('Should not palced inside wrong card-holder-1', () =>{
    cy.visit('./index.html');
    cy.get('#2').drag('#100');
    cy.get('#2').should('exist');
    cy.get('#100').should('exist');
})

it('Should not placed inside wrong card-holder-2', () =>{
    cy.visit('./index.html');
    cy.get('#2').drag('#101');
    cy.get('#2').should('exist');
    cy.get('#101').should('exist');
})

it('Should not placed inside wrong card-holder-3', () =>{
    cy.visit('./index.html');
    cy.get('#2').drag('#103');
    cy.get('#2').should('exist');
    cy.get('#103').should('exist');
})


it('Should be able to win the game', () =>{
    cy.visit('./index.html')
    for(let i = 0; i < 52; i++){
        const source = i;
        const target = i % 4 + 100;
        cy.get(`#${source}`).drag(`#${target}`);
    }
    cy.contains(/won/i);
})

it('Should show restart-button once game won',() =>{
    cy.visit('./index.html')
    for(let i = 0; i < 52; i++){
        const source = i;
        const target = i % 4 + 100;
        cy.get(`#${source}`).drag(`#${target}`);
    }
    cy.get('#restart-button').should('exist');
    cy.get('#restart-button').should('not.have.css', 'display', 'none');
})

// it('Should not show restart-button before winning the game', () =>{
//     cy.visit('./index.html');
//     cy.get('#0').drag('#100');
//     cy.get('#0').should('not.exist');
//     cy.get('#100').should('exist');
//     cy.get('#restart-button').should('have.css', 'display', 'none');
// })

it('Should be able to restart game', () =>{
    cy.visit('./index.html')
    for(let i = 0; i < 52; i++){
        const source = i;
        const target = i % 4 + 100;
        cy.get(`#${source}`).drag(`#${target}`);
    }
    // checking it should not reload
    // mark our window object to "know" when it gets reloaded
    cy.window().then(w => w.beforeReload = true);
    // initially the new property is there
    cy.window().should('have.prop', 'beforeReload', true);
    cy.get('#restart-button').click();
    // after restart should not reload
    cy.window().should('have.prop', 'beforeReload');
    
    // check restart the game or not
    for(let i = 0; i < 52; i++){
        cy.get(`#${i}`).should('exist');
        cy.get(`#${i}`).invoke('attr', 'draggable').should('contain', 'true')
    }
    for(let i = 100; i < 104; i++){
        cy.get(`#${i}`).should('exist');
        cy.get(`#${i}`).invoke('attr', 'draggable').should('not.exist')
    }
    for(let i = 0; i < 52; i++){
        cy.get(`#${i}`).invoke('attr', 'pos').should('not.contain', `#${i}`)
    }
    cy.get('#0').drag('#100');
    cy.get('#0').should('not.exist');
    cy.get('#100').should('exist');
})