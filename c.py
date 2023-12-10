from cursive import cursive_function, Cursive

cursive = Cursive()

@cursive_function()
def add(a: float, b: float):
    """
    Adds two numbers.

    a: The first number.
    b: The second number.
    """
    return a + b

res = cursive.ask(
    prompt='What is the sum of 232 and 243?',
    model = 'command-nightly',
    functions=[add],
    stream=True,
    on_token=lambda partial: print(partial['content'])
)

print({
    'model': res.model,
    'message': res.answer,
    'usage': res.usage.total_tokens,
    'conversation': res.conversation.messages,
})

response = cursive.ask(
    prompt='What is the meaning of life?',
)

print(response.answer)