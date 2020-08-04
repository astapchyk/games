import styles from './style.css';

export default function Home(): HTMLElement {
  const template = `
    <div class=${styles.content}> 
        Home
    </div>
  `;

  const div = document.createElement('div');
  div.insertAdjacentHTML('afterbegin', template);
  return div as HTMLElement;
}
