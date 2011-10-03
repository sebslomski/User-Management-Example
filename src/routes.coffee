app.all('*', (req, res) ->
    if req.body.user?
        user = User.find(where: req.body.user)
        if user and user.isAdmin()
            next()

    res.send({error: 'Access denied'}, 401)
)

app.put('/user', (req, res) ->
    if not req.body.payload?
        res.send('No parameters sent', 400)
    else
        User.build(req.body.payload)
            .save()
            .on('success', ->
                res.send({success: 'Add a new user'})
            ).on('failure', ->
                res.send({error: 'Error while adding a new user'}, 400)
            )
)

app.delete('/user', (req, res) ->
    if req.body.payload?
        res.send('No parameters sent', 400)
    else
        User.find(where: req.body.payload)
            .remove()
            .on('success', ->
                res.send({success: 'User deleted'})
            ).on('failure', ->
                res.send({error: 'Error while deleting the user'}, 400)
            )
)


# Add a new group
app.put('/group', (req, res) ->
    if not req.body.payload?
        res.send({error: 'No parameters sent'}, 400)
    else
        Group.build(req.body.payload)
            .save()
            .on('success', ->
                res.send({success: 'New group added'})
            ).on('failure', ->
                res.send({error: 'Error while adding a new group'}, 400)
            )
)

# Delete an existing group
app.delete('/group', (req, res) ->
    if not req.body.payload?
        res.send({error: 'No parameters sent'}, 400)
    else
        group = Group.find(where: {id: req.body.payload})
        if not group.getUsers()
            group.remove()
            res.send({success: 'Group deleted'})
        else
            res.send({success: 'Group deleted'}, )
)


# Add an user to a group
app.put('/group/:id', (req, res) ->
    if not req.body.payload?
        res.send({error: 'No parameters sent'}, 400)
    else
        user = User.find(where: req.body.payload)
        group = Group.find(where: {id: req.params.id})
        group.addUser(user)
        res.send({success: 'No parameters sent'}, 400)
)


# Remove an user from a group
app.delete('/group/:id', (req, res) ->
    if not req.body.payload?
        res.send({error: 'No parameters sent'}, 400)
    else
        user = User.find(where: req.body.payload)
        group = Group.find(where: {id: req.params.id})
        group.removeUser(user)
)
