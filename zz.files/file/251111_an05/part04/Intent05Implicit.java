package example.app03activityintent;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;

/*
 * ============================================
 * :: android.context.Intent
 * 	-	컴포넌트간 통신수단, 주고 받는 메세지에 대한 상세한 정보 갖는다
 * 	- 	컴포넌트가 이동 및 정보 교환을 추상화한 객체
 * ============================================
 *
 * 1. Explicit Intent (명시적인텐트)
 *     : 사용, 호출, 이동할 Component 를 Intent 생성시 명확히 지정
 *     예) Intent intent = new Intent( Activity정보 );
 *
 * 2. Implicit Intent (묵시적인텐트)
 * 		: 사용, 호출, 이동할 Component 를  Instance 생성시 불명확 지정
 * 		: (intent 의 사전적 의미 는 "의도" 란 뜻이있다.)
 * 		: Intent 생성시 어떤 Component 로 갈지는 모느라 의도만 전달
 *
 *     예)	Intent intent = new Intent(Intent.ACTION_VIEW);
 *           	Intent intent = new Intent(Intent.ACTION_DIAL);
 *             등등... API  Intent static Field 참조
 *     ==> 어떤 Component 수행,이동 할지는 미정
 *     ==> 무엇을 할것인가 인 의도만 갖는 Intent 생성
 *     ==> 그 Intent(의도)를 수행할 component 는 OS에서 검색하여
 *     ==> 사용자가 선택 선택 할 수 있도록한다.
 */
public class Intent05Implicit extends AppCompatActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.intent05_implicit);
	}

	// Event 처리 : android:onClick attribute 사용
	public void xmlOnClick(View v) {

		Intent intent = null;

		if(v.getId() ==R.id.button_web ) {

			intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com"));
			this.startActivity(intent);

		} else if(v.getId() ==R.id.button_call ) {

			intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel://010-0000-0000"));
			this.startActivity(intent);

		} else if(v.getId() ==R.id.button_share ) {

			intent = new Intent(Intent.ACTION_SEND);
			intent.addCategory(Intent.CATEGORY_DEFAULT);
			intent.putExtra(Intent.EXTRA_SUBJECT, "주제");
			intent.putExtra(Intent.EXTRA_TEXT, "내용");
			intent.putExtra(Intent.EXTRA_TITLE, "제목");
			intent.setType("text/plain");

			this.startActivity(intent);
		}
	}
}