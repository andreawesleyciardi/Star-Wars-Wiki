import assignment from '../../assets/documents/Cytora_Assignment.pdf';



const Footer = (props) => {
  	return (
	    <div id="footer">
	    	<a href={ assignment } download>Assignment description</a>
	    	<a href="mailto:developer@andreaciardi.com">Andrea Ciardi - developer@andreaciardi.com</a>
	    </div>
  	);
};

export default Footer;