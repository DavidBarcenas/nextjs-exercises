import Image from 'next/image'

import classes from './hero.module.css'

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/user.jpeg'
          alt='An image showing Davee'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Davee</h1>
      <p>I blog web development - especially frontend frameworks like Angular or React.</p>
    </section>
  );
}

export default Hero;