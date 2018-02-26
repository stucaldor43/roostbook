import React from 'react';
import Comments from './../presentational/Comments.jsx';

class CommentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [{
                username: 'Raheem35',
                date: '2 weeks ago',
                text: 'Nam dolor dolor itaque corporis distinctio veniam iusto eligendi. Sed qui cum est nobis. Nulla exercitationem non aut quia quam.'
            },{
                username: 'Janiya_Carter',
                date: '1 week ago',
                text: 'Consequatur aut sit rerum dolorem. Eaque perferendis et aspernatur facere est illum iste aliquam quia. Impedit praesentium praesentium dolorum id laudantium quidem aut numquam. Distinctio sed praesentium sunt doloremque ex et.'
            },
            {
                username: 'Yvette_Boehm84',
                date: '2 days ago',
                text: 'Perferendis voluptatem ducimus provident libero culpa.Consequatur quia culpa rem eum incidunt perferendis laboriosam ea.'
            },{
                username: 'Ottis17',
                date: '10 minutes ago',
                text: 'Labore suscipit repellat et non sint sunt deleniti autem et. Saepe nobis ut quam velit id. Accusamus ipsa sunt in sunt quae architecto maiores qui. Sint nihil et sapiente deleniti exercitationem voluptas sed. Et impedit omnis ea eos consequuntur rerum. Aut nihil nobis earum porro iusto.'
            }]
        };
    }

    render() {
        return (
            <Comments comments={this.state.comments}/>
        );
    }
}

export default CommentContainer;