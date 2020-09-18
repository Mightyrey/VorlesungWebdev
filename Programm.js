
const test = () => {
    for(let i=1; i<=100;i++)
{
    let Teilbar3 = i;
    Teilbar3 = i % 3;
    let Teilbar5;
    Teilbar5 = i % 5;

    if(Teilbar3==0 && Teilbar5 == 0)
    {
        console.log('Zahl: FizzBuzz')
    }
    else
    {
        if(Teilbar3==0)
        {
            console.log('Zahl: Fizz')
        }

        if(Teilbar5==0)
        {
            console.log('Zahl: Buzz')

    }
    else{
        console.log('Zahl:'+ i);
    }

        }

}
};

console.log(test());


          